import { name } from 'faker'
import * as clientHelpers from '../helpers/clientHelpers'

describe('Test suite', function(){
    it('Hämta alla klienter', function(){
        cy.authenticateSession().then((response =>{
            cy.request({
                method: "GET",
                url: 'http://localhost:3000/api/clients',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
        
            }).then((response =>{
               expect(response.status).to.eq(200)
               expect(response.body.length).to.not.eq(0)
               cy.log(response.body.length)
            }))
        }))
    })
    
    it('Skapa en ny klient', function(){
        cy.authenticateSession().then((response =>{
          //  let fakeClientPayload = clientHelpers.createRandomClientPayload()
          const payload = {
            "name":"rihab",
            "email":"rihaba@hotmail.com",
            "telephone":"0711111111"
        }
            //POST request to create a client
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:payload
            }).then((response =>{
                const stringResponse = JSON.stringify(response)
                expect(stringResponse).to.have.string(payload.name)
        
            }))
                 
            }))
        })

        it("Radera klient", function(){
            clientHelpers.createClientRequest()
        })

        it("Redigera klient", function(){
            clientHelpers.editClient()
        })
        
    })

   
    
