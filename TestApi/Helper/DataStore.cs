using System.Collections.Generic;
using TestApi.Dto;

namespace TestApi.Helper
{
    public static class DataStore
    {
        public static List<Product> GetProducts()
        {
            var lstProducts = new List<Product>();

            lstProducts.Add(new Product() { Id = 1, ModelCode = "SM-S8ABCD13", ProductName = "Galaxy S3", SerialNumber = "SN00000001" });
            lstProducts.Add(new Product() { Id = 2, ModelCode = "SM-S8ABCD17", ProductName = "Galaxy S7", SerialNumber = "SN00000002" });
            lstProducts.Add(new Product() { Id = 3, ModelCode = "SM-S8ABCD18", ProductName = "Galaxy S8", SerialNumber = "SN00000003" });
            lstProducts.Add(new Product() { Id = 4, ModelCode = "SM-S8ABCD19", ProductName = "Galaxy S9", SerialNumber = "SN00000004" });
            lstProducts.Add(new Product() { Id = 5, ModelCode = "SM-S8ABCD10", ProductName = "Galaxy S10", SerialNumber = "SN00000005" });

            return lstProducts;
        }

    }
}
