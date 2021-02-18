const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();

exports.sendAccountTransferEmails = functions.https.onRequest((req, res) => {
  const {newAccount, oldAccount} = req.body;
  functions.logger.log("emailMessage called with: ", req.body);
  // functions.logger.log("newAccount: ", newAccount);
  // functions.logger.log("oldAccount: ", oldAccount);
  return cors(req, res, () => {
    if (null == newAccount || null == oldAccount) {
      // newAccount and oldAccount must be populated
      res.status(400).send("error");
    } else {
      // Create client email message with client email template
      const clientMsg = {
        to: newAccount,
        from: "noreply@leaksmart.com",
        templateId: "d-d6064bb40f93473f80b21a33a9706bac",
        dynamic_template_data:
        {
          "oldAccount": oldAccount,
          "newAccount": newAccount,
        },
      };
      // Create contractor email message with contractor email template
      const contractorMsg = {
        to: oldAccount,
        from: "noreply@leaksmart.com",
        templateId: "d-4f83f996249f4bc395e94b278beb82af",
        dynamic_template_data:
        {
          "oldAccount": oldAccount,
          "newAccount": newAccount,
        },
      };
      // Create email for tech support
      const techSupportMsg = {
        to: "techsupport@leaksmart.com",
        from: "noreply@leaksmart.com",
        templateId: "d-253f65af4cdc4993ab8ff12a73480f97",
        dynamic_template_data:
        {
          "oldAccount": oldAccount,
          "newAccount": newAccount,
        },
      };

      // NOTE this is the Sendmail API key
      sgMail.setApiKey(
          "SG.KrTsjFSBSMiS0LuvniDpKA.5wE0rMejl3i3iWGuSGZ2" +
          "-uddUsrO8qC7OLJ3JJAvZsY"
      );

      // Send messages
      sgMail.send(clientMsg).then(() => {
        sgMail.send(contractorMsg).then(() => {
          sgMail.send(techSupportMsg).then(() => {
            res.status(200).send("{'status': 'success'}");
          }).catch((err) => {
            res.status(500).send("{'status':'error', 'errorMessage': '" +
            err + "'}");
          });
        }).catch((err) => {
          res.status(500).send("{'status':'error', 'errorMessage': '"+err+"'}");
        });
      }).catch((err) => {
        res.status(500).send("{'status':'error', 'errorMessage': '"+err+"'}");
      });
    }
  });
});
