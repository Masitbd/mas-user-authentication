import nodemailer from 'nodemailer';
const transpoert = nodemailer.createTransport({
  service: 'hotmail',
  host: 'smtp-mail.outlook.com',
  secure: false,
  port: 587,
  auth: {
    user: 'maruf9270@hotmail.com',
    pass: 'xjxqbjknhupvuigj',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export const func = async () => {
  const mailData = await transpoert.sendMail({
    from: 'Maruf925@hotmail.com>',
    to: 'Maruf9270@gmail.com',
    subject: 'TEst mail',
    text: 'emailBody',
  });

  console.log(mailData);
};
