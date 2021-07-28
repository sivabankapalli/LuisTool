using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cognitive.LUIS.Programmatic;
using Cognitive.LUIS.Programmatic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LUISToolWebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/LuisAppService")]
    public class LuisAppServiceController : Controller
    {
        protected const string SubscriptionKey = "";
        protected const Regions Region = Regions.WestUS;
        protected const string appVersion = "0.1";
        protected static string appId;
        public LuisAppServiceController()
        {
            var client = new LuisProgClient(SubscriptionKey, Region);
            var app = client.GetAppByNameAsync("HRSquakyLuisApp").Result;
            if (app != null)
                appId = app.Id;
            else
                appId = client.AddAppAsync("HRSquakyLuisApp", "Description test", "en-us", "HRSquakyLuisApp", string.Empty, appVersion).Result;
        }
        // GET: api/Luis
        [HttpGet]
        public async Task<IEnumerable<LuisApp>> GetAllApp(int skip =0, int take = 100)
        {
            using (var client = new LuisProgClient(SubscriptionKey, Region))
            {
                var apps = await client.GetAllAppsAsync();



                return apps.ToList();
            }
        }

        // GET: api/Luis/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Luis
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Luis/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
