import * as superagent from 'superagent'
import * as superagentPromise from 'superagent-promise'
let agent = superagentPromise(superagent, global.Promise)
// Create an agent route
export let createAgentRoute = (router, action, routeUrl, remoteUrl, callback) => {
    router[action](routeUrl, async (ctx, next) => {
        try {
            let result
            if (action === 'post') {
                result = await agent.post(remoteUrl)
                    .type('form')
                    .send(ctx.request.fields.data)
                    .end()
            } else {
                result = await agent.get(remoteUrl)
                    .query(ctx.query)
                    .end()
            }
            ctx.body = { result: JSON.parse(result.text) }
            callback && callback(null, ctx, next)
        } catch (error) {
            ctx.body = { error, result: false }
            callback && callback(error, ctx, next)
        }
    })
}