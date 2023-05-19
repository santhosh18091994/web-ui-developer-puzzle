Accessbility - light house      
---------------------------------------------
-> Color contrast ratio of text should be at least 4.5:1 - Fixed for ".empty>p" element in book-search.component.scss
-> button elements should have "aria-label" attribute for better accessbility - Fixed for buttons in book-search.component.html

book-search.component.html 
---------------------------------------------
-> image tag should contain 'alt' attribute for better accessbility
        --> .book--content--cover >img, reading-list-item--cover elements dont have alt attribute
-> headings has to be wrapped in h1-h6 tags for better accessbility

reading-list.component.scss
---------------------------------------------
-> As ".reading-list-item--cover, .reading-list-item--details, .reading-list-item--actions" are child elements of '.reading-list-item' so css should be nested under parent






Code smell  & Problems
----------------------------------------------
reading-list-reducer.spec.ts
 -> Test Case (failedAddToReadingList should undo book addition to the state)
   -> As mentioned failure case for addtion, state should be same i.e ['A', 'B']
   -> As mentioned failure case for remove from reading list, state should be same i.e ['A', 'B']

reading-list.reducer.ts
-> Reducers are missing for failedRemoveFromReadingList