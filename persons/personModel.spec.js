const db = require('../data/dbConfig.js');

const Person = require('./person-model.js');

describe('person model in proper env', () => {
    it('has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});


describe('person model', () => {
    beforeEach(async() => {
        await db('person').truncate();
    });

    describe('add() then  getById() then delete() changes db length', () => {
        it('should add a person into database', async() => {
            //start out with seeing if empty
            const data = await db('person');
            expect(data).toHaveLength(0);

            //then do the insert
            await Person.add({ name: 'hillbilly' });

            //then check record again
            const newData = await db('person');
            expect(newData).toHaveLength(1);

            //now lets remove it with delete
            const id = 1;
            await Person.getById(id)
                .then(response => {
                    // console.log(response);
                    // const gId = response.id;
                    const nowRemove = response
                        // console.log(gId);
                    return nowRemove;
                });

            await Person.remove(1);
            const nowRemove = await db('person');

            expect(nowRemove).toHaveLength(0);
        })
    })

})

describe('does getAll return an array', () => {
    it('should return an array of seed persons', async() => {
        //start out to check if truncate is in effect still
        const people = await db('person');
        expect(people).toHaveLength(0);
        //truncate worked on this db so lets start over and add a couple

        await Person.add({ name: 'turd' });
        const newCount = await db('person');
        expect(newCount).toHaveLength(1);
        let all = await Person.getAll();
        console.log(all);
        //lets add another  and check again
        await Person.add({ name: 'bacon' });
        const newest = await db('person');
        expect(newest).toHaveLength(2);
        all = await Person.getAll();
        console.log(all);
        await Person.getAll()
            .then(response => {
                console.log(response);
            })
    })
})

describe('testing for info in seed data pre truncate below', () => {
    it('checking for data', async() => {
        await Person.getAll()
            .then(response => {
                console.log(response);
            })
    })
})