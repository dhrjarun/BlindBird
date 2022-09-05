describe('New Chat should be deleted', () => {
  it('If clicked on the chat on other chat, or went somewhere', () => {
    cy.visit('localhost:3000/t/elonTesla');
    cy.contains('Chat').click();

    cy.contains('Dhiraj Arun').click();
    cy.contains(/elon/i).then((element) => {
      expect(element).to.be.hidden;
    });
  });
});

describe('Clicking on chat if the chat is already there', () => {
  it('it should go to that chat', () => {
    cy.visit('localhost:3000/t/kunalCred');
    cy.contains('Chat').click();
  });
});

describe('Create new chat', () => {
  it('It should create new shat on sending the first message', () => {
    cy.visit('localhost:3000/t/elonTesla');
    cy.contains('Chat').click();

    cy.get('.message-input').type('Hey, Elon');
    cy.get('.message-submit-btn').click();
  });
});
