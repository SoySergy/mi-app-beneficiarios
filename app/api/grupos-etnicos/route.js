// app/api/grupos-etnicos/route.js
import { NextResponse } from 'next/server';
import GrupoEtnicoModel from '../../../models/grupoEtnicoModel';

// Petición GET: Obtiene la lista actual para verificación en la Vista
export async function GET() {
  try {
    const grupos = await GrupoEtnicoModel.getAll();
    return NextResponse.json(grupos);
  } catch (error) {
    console.error("Error en GET /api/grupos-etnicos:", error);
    return NextResponse.json({ error: 'Error al obtener los grupos étnicos' }, { status: 500 });
  }
}

// Petición POST: Procesa el envío del formulario de registro
export async function POST(request) {
  try {
    const { nombre } = await request.json();

    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre del grupo étnico es requerido.' }, { status: 400 });
    }

    await GrupoEtnicoModel.create(nombre.trim());
    return NextResponse.json({ message: 'Grupo étnico registrado con éxito.' }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/grupos-etnicos:", error);
    return NextResponse.json({ error: 'Error al guardar el grupo étnico' }, { status: 500 });
  }
}