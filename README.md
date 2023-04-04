# angularRecrutation

DockCosts is an educational project which I've prepared during my Angular learning process. I used most of my current skills here starting from building structure in HTML, styling its in SCSS and finally giving its a 'life'by JavaScript methods, TypeScript, Angular and few more tools like Decimal.js or RXJS.

I started from create components and declared them in ngModule. I have also made a routing with path to one of the component - the parent named container. I have typed all data and also created my own models in config.interface.ts files. I made a directive which is responsible for
allow to input only digits with two decimal. I get the data from inner file by using HttpClient in services but they are actually loaded before enter the component, in route. It happened thank for resolvers. All services are provided in root, which means I'm using depedency injection to be able to use data from every level of the application.

On the visual side I added a little reset for global style, which I imported in styles.scss file due to encapsulation. Colors used in project are declarated in variables. I also used mixins for style elements.
