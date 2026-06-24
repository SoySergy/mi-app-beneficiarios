// app/api/convocatorias/route.js
import { NextResponse } from 'next/server';
import ConvocatoriaModel from '../../../models/convocatoriaModel';

// Petición GET: Devuelve todas las convocatorias para listarlas en la Vista
export async function GET() {
  try {
    const convocatorias = await ConvocatoriaModel.getAll();
    return NextResponse.json(convocatorias);
  } catch (error) {
    console.error("Error en GET /api/convocatorias:", error);
    return NextResponse.json({ error: 'Error al obtener las convocatorias' }, { status: 500 });
  }
}

// Petición PUT: Actualiza el nombre de la convocatoria seleccionada
export async function PUT(request) {
  try {
    const { id, nombre } = await request.json();

    if (!id || !nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (id, nombre)' }, { status: 400 });
    }

    await ConvocatoriaModel.update(id, nombre.trim());
    return NextResponse.json({ message: 'Convocatoria actualizada con éxito' });
  } catch (error) {
    console.error("Error en PUT /api/convocatorias:", error);
    return NextResponse.json({ error: 'Error al actualizar la convocatoria' }, { status: 500 });
  }
}