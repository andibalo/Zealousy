const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMessage = (name, email) => {

    sgMail.send({
        to: email,
        from: 'andibalo213@gmail.com',
        subject: 'Zealousy - Welcome to Zealousy!',
        text: `Hey there ${name}! Thank you for trying out Zealousy. Let us know how you're getting along! Have fun! \n\n- Andi B.\nZealousy CEO`
    })
}

const sendCancellationMessage = (name, email) => {

    sgMail.send({
        to: email,
        from: 'andibalo213@gmail.com',
        subject: `Zealousy - See You Again!`,
        text: `Hey there ${name}! It's hard seeing you go. Before you leave, kindly take a few minutes to fill out our survey to help us improve in the future. Cheers! \n\n- Andi B.\nZealousy CEO`
    })
}

module.exports = {
    sendWelcomeMessage,
    sendCancellationMessage
}