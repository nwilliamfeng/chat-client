


class DefaultEmojiMapping {
    constructor() {
        this._loadEmoji();
          
    }

    _loadEmoji() {

        this._emojis = require('../assets/emoji/default/mapping.json');
       
        const requireContext = require.context("../assets/emoji/default", true, /^\.\/.*\.gif$/);
        const keys= requireContext.keys().sort((a,b)=>{
            const toValue=(x)=>{
                return Number.parseInt( x.replace('./','').replace('.gif',''));
            }
            return toValue(a)-toValue(b);
        });
       
        this._images = keys.map(requireContext);
    }


    splitWithEmojis(str) {
        const reg = /(?:\[\:)(.+?)(?:\])/gm; //正则，找到表情内容

        let ecs = this.getEmojiContents(reg, str);
        ecs.forEach(x => {
            str = str.replace(x, '^!^');
        });
        const items = str.split('^!');
        ecs = ecs.reverse();
        let result = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i] === '') {
                result.push(ecs.pop());
            }
            else if (items[i] === '^') {
                result.push(ecs.pop());
            }
            else if (items[i].startsWith('^')) {
                result.push(ecs.pop());
                result.push(items[i].replace('^', ''));
            }
            else if (items[i] != null) {
                result.push(items[i]);
            }

        }
        return result;
    }

    /**
     * 返回指定key的表情Json对象
     * @param {string} key 
     */
    getEmoji(key) {
        let result=null;
        this._emojis.items.forEach(element => {
            if(element.masks===key){
                result= element;
            }
        });
        if(result==null){
            return null;
        }
        const imgSrc=this._images[ this._emojis.items.indexOf(result)];
        return {...result,imgSrc};
    }


    /**
     * 返回指定emojiCharacter的表情Json对象
     * @param {string} emojiCharacter 
     */
    getEmojiByCharacter(emojiCharacter) {
        let result=null;
        this._emojis.items.forEach(element => {
            if(element.character===emojiCharacter){
                result= element;
            }
        });
        if(result==null){
            return null;
        }
        const imgSrc=this._images[ this._emojis.items.indexOf(result)];
        return {...result,imgSrc};
    }


    /**
     * 返回所有的表情Json对象集合
     */
    getAllEmojis(){
        return this._emojis.items;
    }


    getEmojiContents(reg, str) {
        let result = [];
        while (true) {
            const em = this._matchAll(reg, str).next();
            if (em.value == null) {
                break;
            }
            result.push('[:' + em.value + ']');

        }
        return result;
    }

    /**
     * 枚举符合条件的结果
     * @param {} regex 
     * @param {*} input 
     */
    * _matchAll(regex, input) {
        while (true) {
            const match = regex.exec(input)
            if (match === null) {
                break
            }
            const [, ...captures] = match
            yield captures
        }
    }


}


export const defaultEmojiMapping = new DefaultEmojiMapping();