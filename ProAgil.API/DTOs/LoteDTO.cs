using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.API.DTOs
{
	public class LoteDTO
	{
		public int Id { get; set; }
		[Required(ErrorMessage = "O campo {0} é obrigatório")]
		public string Nome { get; set; }
		[Required]
		public decimal Preco { get; set; }
		public string DataInicio { get; set; }
		public string DataFim { get; set; }
		[Range(2, 120000)]
		public int Quantidade { get; set; }
	}
}
