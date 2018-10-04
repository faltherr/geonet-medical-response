const PatientsCtrl = require('../controllers/PatientsCtrl')
const mockAxios = require('axios')

describe("Get Patient Test", ()=>{
    let req={
        params: {id: 2}
    }
    let res={
        redirect: jest.fn()
    }
    
    test('Return patient with name of Billy', async ()=>{
        mockAxios.post.mockImplementationOnce(()=>{
            Promise.resolve({data: {access_token:12345234}})
        });
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: {sub: "github|40439175"}
            })
        );
        const auth0 =  await AuthCtrl.auth(req, res)
        expect(res.redirect).toHaveBeenCalledWith("/error")
    })
})