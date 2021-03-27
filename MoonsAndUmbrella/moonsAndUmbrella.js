const fakeData = 
`4
2 3 CJ?CC?
4 2 CJCJ
1 3 C?J
2 5 ??J???`

const fetchDataWithStdin = false

const fs = require('fs')

function parseFile() {
    const input = fetchDataWithStdin ?
        fs.readFileSync(0, 'utf8').trim().split('\n'):
        fakeData.trim().split('\n')

    const T = +input[0]
    
    const cases = []

    for (let i = 1; i <= T; i++) {
        cases.push(input[i].split(' ').map((s, i) => i < 2 ? +s : s))
    }
    
    return cases
}

function getValuePaint(paint, CJ, JC) {

    let val = 0

    for (let i = 0; i < paint.length - 1; i++) {
        if (paint[i] === 'C' && paint[i + 1] === 'J') val += CJ
        else if (paint[i] === 'J' && paint[i + 1] === 'C') val += JC
    }
    return val
}

function getCheaperValue(cas) {

    const CJ = cas[0]
    const JC = cas[1]
    const paint = cas[2]
    const len  = paint.length

    let [i, j, k, ret] = [0,0,0,0]

    for(k = 0; k < len - 1; k++)
        if(paint[k] !== '?') break
    if(k === 0) k++
    i = k
    while(i < len - 1)
    {
        if(paint[i] === '?')
        {
            if(paint[i-1] !== paint[i+1] && paint[i+1] !== '?')
            {
                if(paint[i-1 ]=== 'J') ret+=JC
                else ret += CJ
            }
            else if(paint[i-1] !== paint[i+1] && paint[i+1] === '?')
            {
                j = i + 2
                while(paint[j] === '?' && j < len) j++
                if(j === len) break
                if(paint[i-1] !== paint[j])
                {
                    if(paint[i-1] === 'J') ret += JC
                    else ret += CJ
                }
                i = j
            }
        }
        i++
    }
    for(i = 0; i < len-1; i++)
    {
        if(paint[i] === 'J' && paint[i+1] === 'C') ret += JC
        else if(paint[i] === 'C' && paint[i+1] === 'J') ret+=CJ
    }

    return ret
}

function solve(cas) {

    const paint = cas[2]

    if (paint.split('J').length -1 === 0 || paint.split('C').length -1 === 0) {
         return 0
    }
    else if (paint.split('?').length -1 === 0) {
        return getValuePaint(paint, cas[0], cas[1])
    }

    return getCheaperValue(cas)
}

function main() {
    const cases = parseFile()

    cases.forEach((cas, i) => {
        console.log(`Case #${i+1}: ${solve(cas)}`)
    })
}

main()