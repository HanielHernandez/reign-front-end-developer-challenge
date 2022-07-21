# Documentation

## Components

### Tabs 

| Property         |    Type    | Description                                     | Default Value |
| ---------------- | :--------: | ----------------------------------------------- | ------------- |
| tabs             | **Tabs[]** | Array of tabs use to render the tabs Components |
| defaultActiveTab | **String** | String use to define the first active tabs      |

### NewList

| Property |  Type  | Description                                                        | Default Value |
| -------- | :----: | ------------------------------------------------------------------ | ------------- |
| mode     | string | String use to determine wether tho show the saved favs or all favs |

### Select

| Property    |                   Type                   | Description                                                        | Default Value |
| ----------- | :--------------------------------------: | ------------------------------------------------------------------ | ------------- |
| options     |            **SelectOption[]**            | an array of SelectOption objects use to render the options         |
| onChange    | **function (option:SelectOption)=>void** | function  trigger when the user selects an option                  |
| value       |                **String**                | string use to populate the input field use by the select Component |
| placeholder |                **string**                | an string use to set the placeholder of the input use to select    |

## NewListItem

| Property    |                 Type                  | Description                                                                       | Default Value |
| ----------- | :-----------------------------------: | --------------------------------------------------------------------------------- | ------------- |
| article     |              **Article**              | The article object that contains the link and title of the article                |
| favorite    |              **Boolean**              | An boolean property use to determine wether the component's icon should be filled | false         |
| onIconClick | **function (article:article)=> void** | a function triggered when the side icon it's clicked                              |

### Pagination 

| Property    |               Type               | Description                                                             | Default Value |
| ----------- | :------------------------------: | ----------------------------------------------------------------------- | ------------- |
| totalPages  |            **Number**            | A number porperty use to determine the last page that would be rendered |
| currentPage |            **number**            | determines the current page that would be mark with a blue background   |
| onChange    | **function (page:number)=>void** | a function triggered when one of the page button it's clicked           |
  