// import { connected } from "@chainlink/ea-bootstrap/src/lib/ws/actions";
import { AverageResponse } from "./endpoint/average";
import { HighlowResponse } from "./endpoint/highlow";
// import { deepType } from "../../../core/bootstrap/src/lib/external-adapter/util";
// Simple Math & Utility Library 

export interface AddressParse {
  front: string,
  back: string
}

function getAverage(data: AverageResponse[]): number {

  // --- LOCAL VARIABLES ---
  let sum: number = 0;        // Initialize to 0

  // Sum the balances
  for (let entry of data) {
    sum += entry["balance"]
  }

  return sum
}


function getHighAddress(data: HighlowResponse[]): string {

  // --- LOCAL VARIABLES ---
  let      high: number = 0
  let high_acct: string = ''

  for (let entry of data) {
    if(entry["balance"] > high) {
      high = entry["balance"]
      high_acct = entry["address"]
    }
  }
  return high_acct
}

function getLowAddress(data: HighlowResponse[]): string {

  // --- LOCAL VARIABLES ---
  let       low: number = data[0]["balance"]
  let  low_acct: string = data[0]["address"]

  for (let entry of data) {
    if(entry["balance"] < low) {
      low = entry["balance"]
      low_acct = entry["address"]
    }
  }
  return low_acct
}

function dictAddress(data: string): AddressParse {
  data.substr
  let res = {
    "front": data.substring(0,32),
    "back": data.substr(32)
  }
  return res
}

export const EncodeMappings: any = {
   null:0,
    '0':1,
    '1':2,
    '2':3,
    '3':4,
    '4':5,
    '5':6,
    '6':7,
    '7':8,
    '8':9,
    '9':10,
    'A':11,
    'B':12,
    'C':13,
    'D':14,
    'E':15,
    'F':16,
    'G':17,
    'H':18,
    'I':19,
    'J':20,
    'K':21,
    'L':22,
    'M':23,
    'N':24,
    'O':25,
    'P':26,
    'Q':27,
    'R':28,
    'S':29,
    'T':30,
    'U':31,
    'Y':32,
    'X':33,
    'W':34,
    'V':35,
    'Z':36,
    'a':37,
    'b':38,
    'c':39,
    'd':40,
    'e':41,
    'f':42,
    'g':43,
    'h':44,
    'i':45,
    'j':46,
    'k':47,
    'l':48,
    'm':49,
    'n':50,
    'o':51,
    'p':52,
    'q':53,
    'r':54,
    's':55,
    't':56,
    'u':57,
    'v':58,
    'w':59,
    'x':60,
    'y':61,
    'z':62,
}

export const DecodeMappings: any = {
    0: null,
    1: '0',
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
    10:'9',
    11:'A',
    12:'B',
    13:'C',
    14:'D',
    15:'E',
    16:'F',
    17:'G',
    18:'H',
    19:'I',
    20:'J',
    21:'K',
    22:'L',
    23:'M',
    24:'N',
    25:'O',
    26:'P',
    27:'Q',
    28:'R',
    29:'S',
    30:'T',
    31:'U',
    32:'Y',
    33:'X',
    34:'W',
    35:'V',
    36:'Z',
    37:'a',
    38:'b',
    39:'c',
    40:'d',
    41:'e',
    42:'f',
    43:'g',
    44:'h',
    45:'i',
    46:'j',
    47:'k',
    48:'l',
    49:'m',
    50:'n',
    51:'o',
    52:'p',
    53:'q',
    54:'r',
    55:'s',
    56:'t',
    57:'u',
    58:'v',
    59:'w',
    60:'x',
    61:'y',
    62:'z',
}



export { getAverage, getHighAddress, getLowAddress, dictAddress }