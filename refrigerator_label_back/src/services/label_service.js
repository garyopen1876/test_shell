const db = require('../models/index.js');


find_label_all = async () => {
    const request = await db.Labels.findAll({
        include: { model: db.Users ,attributes: ['name', 'mail']},
        order: [['id', 'ASC']],
        attributes: [ 'id', 'date', 'label_id', 'note']
    })
    
    return request;
}

delete_label = async (label_id) => {
    const request = await db.Labels.destroy({
        where: {
            label_id: label_id,
        }
    })
    return request;

}

owner_information = async () => {
    const request = await db.Labels.findAll({
        attributes: ['date','card_id','label_id']
    })
        
    
    return request;
}

update_label = async (body) => {
    const request = await db.Labels.update({
        note: body.note,
    },
        {
            where: {
                id: body.id,
            }
        }
    )
    return request;
}

last_id = async () =>{
    const request = await db.Labels.findOne({
        order: [['id', 'DESC']],
    })
    return request;
}

create_label = async (body) => {
    let array = body.date.split(" ")
    let date = array[0].split("-")

    const user = await db.Users.findOne({
        where: {
            card_id:body.card_id
        }
    })

    const create_label = await db.Labels.create({
        card_id: body.card_id,
        date: body.date,
        label_id: date[1] + date[2] + body.data_id
    })

    create_label.name = user.name
    return create_label;

}




module.exports = {
    create_label,
    find_label_all,
    delete_label,
    update_label,
    owner_information,
    last_id
}

