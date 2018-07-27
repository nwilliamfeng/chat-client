


class DefaultEmojiMapping {
    constructor() {
        this._loadEmoji();
          
    }

    _loadEmoji(emojiPack = 'default') {

        this._emojis = require('../assets/emoji/' + emojiPack + '/mapping.json');
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

    getEmoji(key) {
        let result=null;
        this._emojis.items.forEach(element => {
            if(element.masks===key){
                result= element;
            }
        });
        return result;
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