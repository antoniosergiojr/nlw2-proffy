import { Request, Response } from 'express';

import db from '../database/connection';
import converthourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    // listagem das aulas
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to seacrh classes.'
            })
        }

        const timeInMinutes = converthourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        //console.log("Acessou a rota!");    
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {

            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id: insertedUsersIds[0],
            });

            const classChedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: converthourToMinutes(scheduleItem.from),
                    to: converthourToMinutes(scheduleItem.to),
                    class_id: insertedClassesIds[0],
                };
            });

            await trx('class_schedule').insert(classChedule);

            await trx.commit(); // se tudo os dados forem criados correteamente ae ele inseri no banco 

            return response.status(201).send();
        } catch (error) {
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class.'
            });
        }
    }
}