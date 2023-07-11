const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const {
  PDF_SERVICES_CLIENT_ID,
  PDF_SERVICES_CLIENT_SECRET,
} = require("./Credentials/secret");

const credentials =
  PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
    .withClientId(PDF_SERVICES_CLIENT_ID)
    .withClientSecret(PDF_SERVICES_CLIENT_SECRET)
    .build();
const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

function replaceAnchor(str) {
  let words = str.split(" ");
  let result = "";
  for (let i = 0; i < words.length - 1; i++) {
    if (
      words[i].includes("://www.") &&
      words[i].includes(".", words[i].indexOf(".") + 1)
    ) {
      result += `<a href=\"${words[i]}\">${words[i + 1]}</a>` + " ";
      i++;
    } else {
      result += words[i] + " ";
    }
  }
  result += words[words.length - 1];
  return result;
}
function getJSON(req) {
  const result = {};
  result.Name = req.personal_information.name;
  result.LastName = req.personal_information.last_name;
  result.EmailAddress = req.personal_information.email_address;
  result.PhoneNumber = req.personal_information.phone_number;
  result.LinkedIn = req.personal_information.linkedin_url;
  result.LinkedIn = `<a href=\"${result.LinkedIn}\">linkedIn</a>`;
  result.JobTitle = req.job_title;
  result.Summary = replaceAnchor(req.career_objective);
  result.Skills = req.skills;

  result.Education = [];
  req.education.forEach((element) => {
    let eduData = {};
    eduData.SchoolName = element.school_name;
    eduData.Year = element.passing_year;
    eduData.Description = replaceAnchor(element.description);
    result.Education.push(eduData);
  });
  result.Experience = [];
  req.experience.forEach((element) => {
    let expData = {};
    expData.CompanyName = element.company_name;
    expData.Year = element.passing_year;
    expData.Description = replaceAnchor(element.responsibilities);
    result.Experience.push(expData);
  });
  result.Achievements = [];
  req.achievements.forEach((element) => {
    let achData = {};
    achData.Type = element.field;
    achData.Description = replaceAnchor(element.awards);
    result.Achievements.push(achData);
  });
  console.log(result);
  return result;
}
function verifyRequest(req) {
  return true;
}

module.exports.createResume = function createResume(req, res) {
  let isReqValid = verifyRequest(req.body);
  if (isReqValid === false) {
    return res.status(400).send({ Description: "Bad Request" });
  }

  const valid_templateID = ["1", "2", "3"];
  const template_id = req.body.template_id;

  if (valid_templateID.includes(template_id) === false) {
    return res.status(404).send({ Description: "Template not found" });
  }

  const INPUT = `./Templates/Template${template_id}.docx`;
  const OUTPUT = "./generatedResume.pdf";

  if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

  const JSON_INPUT = getJSON(req.body);

  const documentMerge = PDFServicesSdk.DocumentMerge,
    documentMergeOptions = documentMerge.options,
    options = new documentMergeOptions.DocumentMergeOptions(
      JSON_INPUT,
      documentMergeOptions.OutputFormat.PDF
    );

  const documentMergeOperation = documentMerge.Operation.createNew(options);

  const input = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
  documentMergeOperation.setInput(input);

  documentMergeOperation
    .execute(executionContext)
    .then((result) => {
      return result.saveAsFile(OUTPUT);
    })
    .then(() => {
      res.setHeader("Content-type", "application/pdf");
      return res.status(200).sendFile(OUTPUT, { root: __dirname });
    })
    .catch((err) => {
      if (
        err instanceof PDFServicesSdk.Error.ServiceApiError ||
        err instanceof PDFServicesSdk.Error.ServiceUsageError
      ) {
        console.log("Exception encountered while executing operation", err);
      } else {
        console.log("Exception encountered while executing operation", err);
      }
      return res.status(500).send({ Description: "Internal Server Error" });
    });
};
