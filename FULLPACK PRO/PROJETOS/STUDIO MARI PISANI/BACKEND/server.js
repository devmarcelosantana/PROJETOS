const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;

const SUPABASE_SECRET_KEY =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

const FRONTEND_URL =
    process.env.FRONTEND_URL ||
    "http://localhost:5500";


/*
|--------------------------------------------------------------------------
| VALIDAÇÃO DAS CONFIGURAÇÕES
|--------------------------------------------------------------------------
*/

if (!SUPABASE_URL) {
    console.error("ERRO: SUPABASE_URL não configurada.");
    process.exit(1);
}

if (!SUPABASE_SECRET_KEY) {
    console.error(
        "ERRO: SUPABASE_SECRET_KEY não configurada."
    );

    process.exit(1);
}


/*
|--------------------------------------------------------------------------
| CLIENTE SUPABASE
|--------------------------------------------------------------------------
*/

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
);


/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(
    cors({
        origin: FRONTEND_URL
    })
);

app.use(express.json());


/*
|--------------------------------------------------------------------------
| ROTA PRINCIPAL
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
            "API do Studio Mari Pisani está funcionando."
    });

});


/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        status: "online"
    });

});


/*
|--------------------------------------------------------------------------
| CRIAR AGENDAMENTO
|--------------------------------------------------------------------------
*/

app.post("/api/appointments", async (req, res) => {

    try {

        const {
            name,
            phone,
            date,
            time,
            services
        } = req.body;


        /*
        |--------------------------------------------------------------------------
        | VALIDAÇÃO DOS CAMPOS
        |--------------------------------------------------------------------------
        */

        if (
            !name ||
            !phone ||
            !date ||
            !time
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Preencha todos os campos obrigatórios."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAÇÃO DOS SERVIÇOS
        |--------------------------------------------------------------------------
        */

        if (
            !Array.isArray(services) ||
            services.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Selecione pelo menos um serviço."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAÇÃO DO NOME
        |--------------------------------------------------------------------------
        */

        const cleanName = name.trim();

        if (cleanName.length < 2) {

            return res.status(400).json({
                success: false,
                message:
                    "Informe um nome válido."
            });

        }

        if (cleanName.length > 120) {

            return res.status(400).json({
                success: false,
                message:
                    "O nome informado é muito longo."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAÇÃO DA DATA
        |--------------------------------------------------------------------------
        */

        const appointmentDate =
            new Date(`${date}T00:00:00`);

        if (
            Number.isNaN(
                appointmentDate.getTime()
            )
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Data inválida."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | NÃO PERMITIR DOMINGO
        |--------------------------------------------------------------------------
        */

        const dayOfWeek =
            appointmentDate.getDay();

        if (dayOfWeek === 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Não é possível realizar agendamento aos domingos."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAR HORÁRIO
        |--------------------------------------------------------------------------
        */

        const timeRegex =
            /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!timeRegex.test(time)) {

            return res.status(400).json({
                success: false,
                message:
                    "Horário inválido."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR HORÁRIO RESERVADO
        |--------------------------------------------------------------------------
        */

        const {
            data: existingAppointments,
            error: existingError
        } = await supabase
            .from("appointments")
            .select("id")
            .eq(
                "appointment_date",
                date
            )
            .eq(
                "appointment_time",
                time
            )
            .in(
                "status",
                [
                    "pending",
                    "confirmed"
                ]
            )
            .limit(1);


        if (existingError) {

            console.error(
                "Erro ao verificar disponibilidade:",
                existingError
            );

            return res.status(500).json({
                success: false,
                message:
                    "Erro ao verificar disponibilidade."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | HORÁRIO OCUPADO
        |--------------------------------------------------------------------------
        */

        if (
            existingAppointments &&
            existingAppointments.length > 0
        ) {

            return res.status(409).json({
                success: false,
                message:
                    "Este horário já está reservado."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | SALVAR AGENDAMENTO
        |--------------------------------------------------------------------------
        */

        const {
            data,
            error
        } = await supabase
            .from("appointments")
            .insert([
                {
                    name: cleanName,

                    phone: phone.trim(),

                    appointment_date: date,

                    appointment_time: time,

                    services,

                    status: "pending"
                }
            ])
            .select()
            .single();


        /*
        |--------------------------------------------------------------------------
        | ERRO AO SALVAR
        |--------------------------------------------------------------------------
        */

        if (error) {

            console.error(
                "Erro ao salvar agendamento:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Não foi possível salvar o agendamento."
            });

        }


        /*
        |--------------------------------------------------------------------------
        | SUCESSO
        |--------------------------------------------------------------------------
        */

        return res.status(201).json({

            success: true,

            message:
                "Agendamento solicitado com sucesso.",

            appointment: data

        });


    } catch (error) {

        console.error(
            "Erro interno:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Erro interno do servidor."
        });

    }

});


/*
|--------------------------------------------------------------------------
| LISTAR AGENDAMENTOS
|--------------------------------------------------------------------------
*/

app.get(
    "/api/appointments",
    async (req, res) => {

        try {

            const {
                data,
                error
            } = await supabase
                .from("appointments")
                .select("*")
                .order(
                    "appointment_date",
                    {
                        ascending: true
                    }
                )
                .order(
                    "appointment_time",
                    {
                        ascending: true
                    }
                );


            if (error) {

                console.error(
                    "Erro ao buscar agendamentos:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Erro ao buscar agendamentos."
                });

            }


            return res.json({

                success: true,

                appointments: data

            });


        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Erro interno do servidor."
            });

        }

    }
);


/*
|--------------------------------------------------------------------------
| ALTERAR STATUS
|--------------------------------------------------------------------------
*/

app.patch(
    "/api/appointments/:id/status",
    async (req, res) => {

        try {

            const {
                id
            } = req.params;

            const {
                status
            } = req.body;


            const allowedStatuses = [

                "pending",

                "confirmed",

                "cancelled",

                "completed"

            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Status inválido."

                });

            }


            const {
                data,
                error
            } = await supabase

                .from("appointments")

                .update({
                    status
                })

                .eq("id", id)

                .select()

                .single();


            if (error) {

                console.error(
                    "Erro ao atualizar status:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Não foi possível alterar o status."

                });

            }


            return res.json({

                success: true,

                appointment: data

            });


        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Erro interno do servidor."

            });

        }

    }
);


/*
|--------------------------------------------------------------------------
| SERVIDOR
|--------------------------------------------------------------------------
*/
// PUT: Atualiza o status do agendamento (confirmar ou cancelar)
app.put('/api/appointments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Aceitará 'confirmado' ou 'cancelado'

    try {
        const { data, error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json({ success: true, appointment: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `API do Studio Mari Pisani rodando na porta ${PORT}`
        );

    }
);