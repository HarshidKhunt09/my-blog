import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(
  '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'
);

const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html };

  return sendgrid.send(msg);
};

export default sendEmail;
