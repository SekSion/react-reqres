import SignInUp from './SignInUp'

describe('<SignInUp />', () => {
  it('renders', () => {
    cy.mount(<SignInUp />);

    // Find the email input field and type "test@"
    cy.get('input[type="email"]').type('test@');

    // Check if the component contains the expected error message
    cy.contains('Invalid email format').should('be.visible');

    // You can add more assertions or actions as needed for your specific test case
  });
});
