import { add } from './index'
import 'should'
/**
* Synchronization test
*/
describe('test add', () => {
    it('1 + 1 should be equal to 2', () => {
        add(1, 1).should.eql(2)
    })
})

/**
* Asynchronous test
*/
describe('test async add', () => {
    it('2 + 2 should be equal to 4', (done) => {
        setTimeout(() => {
            add(2, 2).should.eql(4)
            done()
        }, 2000)
    })
})