# Documentation

## Components

### Tabs 

| Property         |            Type             | Description                                                                                   |
| ---------------- | :-------------------------: | --------------------------------------------------------------------------------------------- |
| tabs             |         **Tabs[]**          | Array of tabs used to render the tabs Components                                              |
| defaultActiveTab |         **String**          | String used to define the default active tab                                                  |
| onRender         | **function ()=> ReactNode** | A function that returns the component that should be rendered when one of the tab it's active |

### NewList

| Property |    Type    | Description                                                                  |
| -------- | :--------: | ---------------------------------------------------------------------------- |
| mode     | **string** | String used to determine whether to show locally saved favs news or all news |

### Select

| Property    |                   Type                   | Description                                                                           |
| ----------- | :--------------------------------------: | ------------------------------------------------------------------------------------- |
| options     |            **SelectOption[]**            | An array of SelectOption objects use to render the options                            |
| onChange    | **function (option:SelectOption)=>void** | A function that's gets triggered when the user selects an option                      |
| value       |                **String**                | A String used to populate the input field used by the select Component                |
| placeholder |                **string**                | An string used to set the placeholder of the input field used by the select component |

### NewListItem

| Property    |                 Type                  | Description                                                                             |
| ----------- | :-----------------------------------: | --------------------------------------------------------------------------------------- |
| article     |              **Article**              | An article object that contains the data from the article                               |
| favorite    |              **Boolean**              | An boolean property use to determine whether the component's side icon should be filled |
| onIconClick | **function (article:article)=> void** | A function that's gets triggered when the side icon it's clicked                        |

### Pagination 

| Property    |               Type               | Description                                                                                               |
| ----------- | :------------------------------: | --------------------------------------------------------------------------------------------------------- |
| totalPages  |            **Number**            | A number porperty used to determine the amount of pages and the last page that the component would render |
| currentPage |            **Number**            | A number the defines current active page of the pagination component,                                     |
| onChange    | **function (page:number)=>void** | A function that's gets triggered when one of the pagination buttons it's clicked                                 |
  