/// <reference types ="Cypress" />

describe('New User Registration', function () {

    // All the below variable are used for partnet Registration details. 

    let orgName = 'Organization Infotech';

    let orgAddress = 'Mumbai, Maharashtra, Indian';

    let contName = 'Rahul Naresh Tripati';

    let contractAddress = 'Pune, Maharashtra, Indian';

    let contractToken = '2t1aty314qcla08jesatpyurxa';

    let password = 'Pravin#1479';

    // All the above variable are used for partner Registration details.

    it('Visit Registration site', function () {
        cy.viewport(1326, 1326)

        cy.visit('https://app.acknoledger.com/register')

        cy.url().should('include', '/register')
    })

    // For testing purposes creating email from mentioned domain in yellow alert will be help full. Create email from https://www.dispostable.com/ website for testing purposes. 

    alert("Visit https://www.dispostable.com/ site on new tab, create new email and Click Ok, Once you created. ");

    let emailID = prompt("Please enter your Email", "newregistration_3@dispostable.com"); //enter new email here

    it('Provide new Email', function () {
        cy.viewport(1326, 1326)

        if (emailID != null) {
            cy.get('input[type="email"]').type(emailID)
        }

        cy.wait(1000)

        cy.get('button[name="Send OTP"]').click()


    })

    it('Provide OTP', function () {
        cy.viewport(1326, 1326)

        cy.url().should('include', '/register')

        cy.get('.akno-otp > :nth-child(1)').should('have.text', 'Enter OTP')

        // Separate username from the email before @ symbol. And store it into variable.

        let UserName_email = emailID.substring(0, emailID.indexOf("@"));

        alert("To get OTP Visit https://www.dispostable.com/inbox/" + UserName_email + "/ And Copy the OTP. Once OTP has sended");

        // Redirect user to proceed towards the next step.

        cy.log('*** Get OTP from your provided email. or visit https://www.dispostable.com/inbox/' + UserName_email + '/ On new tab. And Copy the OTP.***')

        // Tack the OTP from the user within resivied email.

        let otp = prompt("Please enter resivided OTP", "");

        const AryOtp = otp.split(""); // Split the string into Array

        // This is Automation to take otp from user and enter within each input single digit box respactivily. 

        AryOtp.forEach((element, index, array) => {
            let j = index + 1;
            cy.get(':nth-child(' + j + ') > input').type(array[index]);
            j++;
        });

        cy.wait(1000)

        cy.get('.btn-secondary').click()


    })

    it('Provide Requested Details', function () {
        cy.viewport(1326, 1326)

        // This is used for providing details to partner Registration Form.

        cy.url().should('include', '/register')

        cy.get('input[name="orgName"]').type(orgName);

        cy.get('input[name="orgAddress"]').type(orgAddress);

        cy.get('input[name="contName"]').type(contName);

        cy.get('input[name="contractAddress"]').type(contractAddress);

        cy.get('input[name="contractToken"]').type(contractToken);

        cy.get('input[name="password"]').type(password);

        cy.get(':nth-child(11) > .show-password').click();

        cy.wait(500);

        cy.get('input[name="confirmPassword"]').type(password);

        cy.get(':nth-child(13) > .show-password').click()

        cy.wait(900);

        cy.get('.btn-secondary').click();

        // After submitting all the required details the Form will load on login page.

        cy.wait(3000);

        cy.url().should('include', '/login');

    })

})