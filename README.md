# drawerjs

#### Drawer for Dynamics CRM

##### how to use
Import drawerjs in the form properties, and then add the following code where you need to open the drawer

```
controllDrawer({
            drawer: {
                title: 'drawer',
                buttons: {
                    confirm: {
                        title: 'confirm',
                        callback: function (executionContext) {
                            console.log(executionContext)
                            return executionContext.submit()
                        }
                    },
                    cancel: {
                        title: 'cancel',
                        callback: function () {
                            console.log("cancel clicked")
                        }
                    }
                },
                size: '30%',
                direction: 'rtl',
                baseUrl: '',
                webresource:webresource ,
            }
        })
```

and one another thing...
Only suitable for opening drawer and displaying webresource,yeah,that's it. 💖💖💖
