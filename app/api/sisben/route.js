// app/api/sisben/route.js
import { NextResponse } from 'next/server';
import SisbenModel from '../../../models/sisbenModel';

// Petición GET: Listar categorías del SISBEN en la Vista
export async function GET() {
  try {
    const categorias = await SisbenModel.getAll();
    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Error en GET /api/sisben:", error);
    return NextResponse.json({ error: 'Error al obtener las categorías del SISBEN' }, { status: 500 });
  }
}

// Petición PUT: Actualizar el nombre de una categoría del SISBEN
export async function PUT(request) {
  try {
    const { id, nombre } = await request.json();

    if (!id || !nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (id, nombre)' }, { status: 400 });
    }

    await SisbenModel.update(id, nombre.trim());
    return NextResponse.json({ message: 'Categoría de SISBEN actualizada con éxito' });
  } catch (error) {
    console.error("Error en PUT /api/sisben:", error);
    return NextResponse.json({ error: 'Error al actualizar la categoría de SISBEN' }, { status: 500 });
  }
}