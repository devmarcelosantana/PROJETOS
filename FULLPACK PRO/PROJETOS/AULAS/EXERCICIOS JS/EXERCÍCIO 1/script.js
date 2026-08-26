const companies = [
    {name: 'Samsung', marketValue: 50, CEO: 'Kim Hyun Suk', foundedOn: 1938},
    {name:'Microsoft', marketValue: 415, CEO: 'Satya Nadella', foundedOn: 1975},
    {name:'Intel', marketValue: 117, CEO: 'Pat Gelsinger', foundedOn: 1968},
    {name:'Facebook', marketValue: 383, CEO: 'Mark Zuckerberg', foundedOn: 2004},
    {name:'Apple', marketValue: 845, CEO: 'Tim Cook', foundedOn: 1976},
    {name:'Spotify', marketValue: 30, CEO: 'Daniel Ek', foundedOn: 2006},
]

const newCompanies = companies.map((company) => {
    return {
        Company: company.name,
        Value: company.marketValue - (company.marketValue*0.1),
        CEO: company.CEO,
        Founded: company.foundedOn
    }
})
.filter((company) => {
    return company.Founded > 1980;
})
.reduce((acc, company) => {
    return acc + company.Value
}, 0)

console.log(newCompanies)
