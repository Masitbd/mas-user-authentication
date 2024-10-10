import nodemailer from 'nodemailer';
const transpoert = nodemailer.createTransport({
  service: 'hotmail',
  host: 'smtp-mail.outlook.com',
  secure: false,
  port: 587,
  auth: {
    user: 'marufahmed9270@gmail.com',
    pass: 'igfpmhfejgssjrpi',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export const func = async () => {
  const mailData = await transpoert.sendMail({
    from: 'Marufahmed9270@gmail.com',
    to: 'Maruf9270@gmail.com',
    subject: 'TEst mail',
    text: 'emailBody',
  });

  console.log(mailData);
};
