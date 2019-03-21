Template = {
    create: (html, root, formatter, callback)=>{
        var template = {};
        template.list = [];
        template.root = root;
        template.html = html;
        template.formatter = formatter == undefined ? ()=>{return[];} : formatter;
        template.callback = callback == undefined ? ()=>{} : callback;

        template.notifyAppend = (data) => {
            var self = template;
            var cnt = self.list.length;
            var args = self.formatter(data, cnt);
 
            var element = $(String.format2(self.html, args)).appendTo(self.root);

            self.callback(data, cnt);

            
            self.list.push({'element': element, 'data': data, 'cnt': cnt});
        }

        return template;
    }
};

Model = {
    binding: (template) => {
        var model = {};
        model.template = template;
        model.getData = (api) => {
            $.get(api, (data) => {
                if(data['code'] != 0) return;
                data = data['data'];
                for(var i=0; i<data.length; ++i) {
                    model.template.notifyAppend(data[i]);
                }
            });
        }

        return model;
    }
}
