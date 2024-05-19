import { Field, FieldLocation } from "@/api/fields/fields.model";
import { CreateMatch, Player, Team } from "@/api/matches/matches.model";
import moment from "moment";

export function validateEmailAndPassword(email: string, password: string) {
    const errors = [];
    if (!email || !email.trim()) {
        errors.push("Email es requerido");
    }
    if (!password || !password.trim()) {
        errors.push("Contraseña es requerida");
    }
    return errors;
}

function validateFieldLocationIsNotEmpty(location: FieldLocation) {
    const errors = [];
    if (!location.prefix) {
        errors.push("Prefijo de dirección es requerido");
    }
    if (!location.city) {
        errors.push("Ciudad es requerida");
    }
    if (!location.country) {
        errors.push("País es requerido");
    }
    return errors;
}

function validateFieldIsNotEmpty(field: Field) {
    const errors = [];
    if (!field.name) {
        errors.push("Nombre de cancha es requerido");
    }
    if (!field.imageUrl) {
        errors.push("Imagen de cancha es requerida");
    }
    const locationErrors = validateFieldLocationIsNotEmpty(field.location);
    return [...errors, ...locationErrors];
}

function validateTeamIsNotEmpty(team: Team) {
    const errors = [];
    if (!team.name) {
        errors.push("Nombre del equipo es requerido");
    }
    if (!team.lineup) {
        errors.push("Alineación es requerida");
    }
    return errors;

}

export function validateMatchIsNotEmpty(match: CreateMatch) {
    const errors = [];
    if (!match.name) {
        errors.push("Nombre es requerido");
    }
    if (!match.date) {
        errors.push("Fecha es requerida");

        if(moment(match.date).isBefore(moment())) {
            errors.push("Fecha no puede ser en el pasado");
        }
    }
    const fieldErrors = validateFieldIsNotEmpty(match.field);
    const homeErrors = validateTeamIsNotEmpty(match.home);
    const awayErrors = validateTeamIsNotEmpty(match.away);
    return [...errors, ...fieldErrors, ...homeErrors, ...awayErrors];
}

export function validatePlayerIsNotEmpty(player: Player) {
    const errors = [];
    if (!player.name) {
        errors.push("Nombre es requerido");
    }
    if (player.pos == undefined || player.pos == null) {
        errors.push("Posición es requerida");
    }
    return errors;
}