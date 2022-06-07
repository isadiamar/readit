import {Element} from "@angular/compiler";

declare namespace Cypress {
  interface Chainable<Subject = string> {
    login(): Chainable<Element>;
    completeStoryForm():Chainable<Element>
    navigateToStories():Chainable<Element>
    createStory(navigate:string):Chainable<Element>
    completeEpisodeForm():Chainable<Element>
  }
}
