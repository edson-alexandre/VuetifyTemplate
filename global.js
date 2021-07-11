const baseApiUrl = process.env.NODE_ENV==='production' ?  
                'http://18.117.25.35:3006':
                'http://localhost:3006'
              
export { baseApiUrl }                