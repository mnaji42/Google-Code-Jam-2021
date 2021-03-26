const fakeData = '3\n4\n4 2 1 3\n2\n1 2\n7\n7 6 5 4 3 2 1'

const fetchDataWithStdin = true

const fs = require('fs')

function reversePartArray(array, begin, length) {
    array = array.slice()
    array.splice(begin, length, ...array.slice(begin, begin+length).reverse())
    return array
}

function reverse(list) {
    let res = 0
    const n = list.length
    
    for (let i = 0; i < n -1 ; i++) {
        let min = Infinity
        let pos = i

        for (let j = i; j < n; j++) {
            if (list[j] < min) {
                min = list[j]
                pos = j
            }
        }
        list = reversePartArray(list, i, pos + 1 - i)
        res += pos - i + 1
    }
    return res
}

function parseFile() {
    const input = fetchDataWithStdin ?
        fs.readFileSync(0, 'utf8').trim().split('\n'):
        fakeData.trim().split('\n')

    const T = input[0]
    
    const cases = []

    for (let i = 2; i < T*2+1; i+=2) {
        cases.push(input[i].split(' ').map(x => +x))
    }
    
    return cases
}

function main() {
    const cases = parseFile()

    cases.forEach((cas, i) => {
        console.log(`Case #${i+1}: ${reverse(cas)}`)
    })

}

main()