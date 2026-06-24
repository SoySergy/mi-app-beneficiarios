// app/api/localidades/[id]/route.js
import { NextResponse } from 'next/server';
import LocalidadModel from '../../../../models/localidadModel';

// PUT: Actualiza una localidad
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { nombre } = await request.json();
    await LocalidadModel.update(id, nombre);
    return NextResponse.json({ message: 'Actualizada con éxito' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

// DELETE: Borra una localidad
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await LocalidadModel.delete(id);
    return NextResponse.json({ message: 'Borrada con éxito' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al borrar' }, { status: 500 });
  }
}