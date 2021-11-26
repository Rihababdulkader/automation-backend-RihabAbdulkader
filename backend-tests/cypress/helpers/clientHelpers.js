const faker = require('faker')

    
    function createRandomClientPayload(){
        const fakeName = faker.name.firstName()
        const fakeEmail = faker.internet.email()
        const fakePhone = faker.phone.phoneNumber()

        const payload = {
            "name": fakeName,
            "email": fakeEmail,
            "telephone": fakePhone
        }

        return payload

    }    

    function createClientRequest(){
        cy.authenticateSession().then((response =>{
            const clientPayload = {
            "name": "fakeDeleteName",
            "email": "fakeDeleteEmail",
            "telephone": "12345"
            }
            cy.request({
             method: "POST",
             url: "http://localhost:3000/api/client/new",
             headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: clientPayload
            }).then((response =>{
                const responseString = JSON.stringify(response)
                cy.log(response.name)
                expect(responseString).to.have.string("fakeDeleteName")
            }))
                
                //kalla på metod för att ta bort en klient
                deleteClientAfterCreate();
                
        }))
    }   

    
    function deleteClientAfterCreate(){
        cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: "http://localhost:3000/api/clients",
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        }).then((response =>{
           let lastId = response.body[0].id
            cy.request({
            method: "DELETE",
            url: "http://localhost:3000/api/client/" + lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        

        })

        }))
        

    }))

    }
    function editClient(){
        cy.authenticateSession().then((response =>{
        cy.request({
        method: "GET",
        url: "http://localhost:3000/api/clients",
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        }).then((response =>{
            const clientData = response.body[response.body.length - 1]
            clientData.name = "Testnamn"
            clientData.email = "testnamn@example.com"

            cy.request({
            method: "PUT",
            url: "http://localhost:3000/api/client/" + clientData.id,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:clientData
            
        }).then((response =>{
            const responseString = JSON.stringify(response.body)
            expect(responseString).to.have.string(clientData.name)
            expect(responseString).to.have.string(clientData.email)
        }))

        }))
        cy.log(response.body)

    }))

    }

    function logOut(){
        cy.authenticateSession().then((response =>{
        cy.request({
        method: "POST",
        url: "http://localhost:3000/api/logout",
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        }).then((response =>{
            
                /*const clientData = response.body[response.body.length - 1]
            clientData.name = "Testnamn"
            clientData.email = "testnamn@example.com"
*/
            cy.request({
            method: "PUT",
            url: "http://localhost:3000/api/client/" + clientData.id,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:clientData
            
        }).then((response =>{
            const responseString = JSON.stringify(response.body)
            expect(responseString).to.have.string(clientData.name)
            expect(responseString).to.have.string(clientData.email)
        }))

        }))
        cy.log(response.body)

    }))

    }

    

module.exports = {
    createRandomClientPayload,
    createClientRequest,
    deleteClientAfterCreate,
    editClient
}