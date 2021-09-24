import { EncodeMappings, DecodeMappings } from "./util";

class TextEncoding6bit {
    readonly BitsPerChar: number = 6;
    /**
     * Encode
        value: string    */
    public Encode(value: string): string {

        var result: string = '';
        var coderes: string = '';
        var array: Uint8Array = new Uint8Array(32);
        var c = Math.ceil(value.length*6/8)*8;

        for (var _i = 0; _i < value.length; _i++) {
            var character = value[_i]
            var code = EncodeMappings[character]
            coderes = coderes + code + " "

            var binary = this.dec2bin(code)

            while (binary.length < 6) {
                binary = '0' + binary
            }

            result = result.concat(binary)
        }

        result = result.padEnd(c,'0')

        var index = 0   // The index of the Uint8Array

        // Loop through the string and parse [0:7] in each index
        for (var _j=0; _j < result.length; _j=_j+8) {
            binary = result.slice(_j,_j+8)
            array[index] = parseInt(binary,2)
            index += 1
        }

        var final = this.toHex(array)

        return final
    }

    /**
     * Encode
        value: string    */
        public Decode(hex: string): string {

            var res = this.hex2Uint8Array(hex)
            var ne  = this.getBinString(res)
            var str = this.bin2str(ne)

            return str
        }

    private dec2bin(dec:number) {
        return (dec >>> 0).toString(2);
    }

    private dec2bin_pad(dec:number) {
        return (dec >>> 0).toString(2).padStart(8,'0');
    }

    private bin2dec(bin:string) {
        return parseInt(bin,2)
    }

    private toHex(array: Uint8Array) {
        var hex = [...new Uint8Array(array.buffer)].map(x => x.toString(16).padStart(2, '0')).join('')
        hex = '0x'.concat(hex)
        return hex
    }

    private hex2Uint8Array(hex:any) {
        var str = hex.slice(2)
        return new Uint8Array(str.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));
    }

    private getBinString(uint8array:any) {
        var str = ''
    
        for (var index in uint8array) {
    
            var num = uint8array[index]
            var num1 = uint8array[(parseInt(index)+1).toString()]
            
            if(num1 == 0) {
                var s = (num >>> 0).toString(2)
                str =str.concat(s)
                break
            }
    
            
            var s = this.dec2bin_pad(num)
            str = str.concat(s)
        }
    
        return str
    }

    private bin2str(bin:string) {
        var result = ''
        
        for (var _i=0; _i < bin.length; _i=_i+6) {
            var binary = bin.slice(_i,_i+6)
            var int = this.bin2dec(binary)
            var str = DecodeMappings[int]
            if (str != null) {
                result = result.concat(str)
            }
        }

    
        return result
    }
}

export { TextEncoding6bit }
