export function validateCPF(cpf: string): boolean {
  // Remove tudo que não for número
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Elimina CPFs com todos os números iguais
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Validação dos dois dígitos verificadores
  for (let t = 9; t < 11; t++) {
    let sum = 0;
    for (let i = 0; i < t; i++) {
      sum += parseInt(cpf[i]) * (t + 1 - i);
    }
    let digit = (sum * 10) % 11;
    if (digit === 10) digit = 0;
    if (digit !== parseInt(cpf[t])) return false;
  }

  return true;
}
