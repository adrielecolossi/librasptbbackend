const axios = require('axios');

test('Should get posts', async function(){

    const response = await axios({
        url: 'http://localhost:3000/questao',
        method: 'get'
    })
    const questoes = response.data
    expect(questoes).toHaveLength(0)
})

