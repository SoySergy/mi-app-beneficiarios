// app/api/beneficiarios/route.js
import { NextResponse } from 'next/server';
import BeneficiarioModel from '../../../models/beneficiarioModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Validación para prevenir números negativos o vacíos
    const currentPage = page > 0 ? page : 1;
    const currentLimit = limit > 0 ? limit : 50;
    
    // Cálculo de la fila de inicio (OFFSET)
    const offset = (currentPage - 1) * currentLimit;

    // Ejecuta las dos consultas en paralelo para mejorar el rendimiento
    const [total, data] = await Promise.all([
      BeneficiarioModel.getTotalCount(),
      BeneficiarioModel.getPaginated(currentLimit, offset)
    ]);

    return NextResponse.json({
      data,
      pagination: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages: Math.ceil(total / currentLimit)
      }
    });
  } catch (error) {
    console.error("Error en GET /api/beneficiarios:", error);
    return NextResponse.json(
      { error: 'Error al obtener los datos de beneficiarios' }, 
      { status: 500 }
    );
  }
}