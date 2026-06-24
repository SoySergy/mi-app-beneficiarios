// app/api/modalidades/route.js
import { NextResponse } from 'next/server';
import ModalidadModel from '../../../models/modalidadModel';

// Petición GET: Listar modalidades
export async function GET() {
  try {
    const modalidades = await ModalidadModel.getAll();
    return NextResponse.json(modalidades);
  } catch (error) {
    console.error("Error en GET /api/modalidades:", error);
    return NextResponse.json({ error: 'Error al obtener las modalidades' }, { status: 500 });
  }
}

// Petición POST: Insertar nueva modalidad
export async function POST(request) {
  try {
    const { nombre } = await request.json();

    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre de la modalidad es obligatorio.' }, { status: 400 });
    }

    await ModalidadModel.create(nombre.trim());
    return NextResponse.json({ message: 'Modalidad registrada con éxito.' }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/modalidades:", error);
    return NextResponse.json({ error: 'Error al guardar la modalidad' }, { status: 500 });
  }
}