# drawerjs

#### Drawer for Dynamics CRM

##### how to use

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
