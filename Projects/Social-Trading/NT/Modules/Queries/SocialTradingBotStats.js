exports.newSocialTradingModulesQueriesSocialTradingBotStats = function newSocialTradingModulesQueriesSocialTradingBotStats() {

    let thisObject = {
        socialTradingBot: undefined,
        execute: execute,
        initialize: initialize,
        finalize: finalize
    }

    return thisObject

    function finalize() {
        thisObject.socialTradingBot = undefined
    }

    function initialize(queryReceived) {
        /*
        Validate User Profile
        */
        let socialPersona
        if (queryReceived.targetSocialPersonaId !== undefined) {
            socialPersona = SA.projects.socialTrading.globals.memory.maps.SOCIAL_PERSONAS_BY_ID.get(queryReceived.targetSocialPersonaId)
        } else {
            socialPersona = SA.projects.socialTrading.globals.memory.maps.SOCIAL_PERSONAS_BY_HANDLE.get(queryReceived.targetUserProfileHandle)
        }

        if (socialPersona === undefined) {
            throw ('Target Social Persona Not Found.')
        }
        /*
        Validate Bot Profile
        */
        thisObject.socialTradingBot = socialPersona.bots.get(queryReceived.targetSocialTradingBotId)
        if (thisObject.socialTradingBot === undefined) {
            throw ('Target Social Trading Bot Not Found.')
        }
    }

    function execute() {

        return {
            "socialPersonaId": thisObject.socialPersona.id,
            "botProfileId": thisObject.socialTradingBot.botProfileId,
            "botProfileHandle": thisObject.socialTradingBot.botProfileHandle,
            "followingCount": thisObject.socialTradingBot.following.size,
            "followersCount": thisObject.socialTradingBot.followers.size,
            "postsCount": thisObject.socialTradingBot.posts.size,
            "emitterEventsCount": thisObject.socialTradingBot.emitterEventsCount,
            "targetEventsCount": thisObject.socialTradingBot.targetEventsCount            
        }
    }
}