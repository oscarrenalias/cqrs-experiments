module.exports = {
    messageBuilder: function(sender, messageType, payload) {
        return({
            "id": "uuid",
            "timestamp": (new Date()).toString(),
            "sender": sender,
            "type": messageType,
            "payload": payload
        });
    },

    payment: function(sender, fromAccount, toAccount, amount, currency) {
        return(this.messageBuilder(sender, "payment", {
            "fromAccount": fromAccount, 
            "toAccount": toAccount, 
            "amount": amount, 
            "currency": currency
        }));
    }
}