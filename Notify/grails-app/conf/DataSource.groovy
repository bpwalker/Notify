dataSource {
	pooled = true
	driverClassName = "com.mysql.jdbc.Driver"
	dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"			
	logSql=true
}
hibernate {
	cache.use_second_level_cache = true
	cache.use_query_cache = true
	cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}

environments {
	development {
		dataSource {
			dbCreate = "create-drop"
			url = "jdbc:mysql://localhost:3306/test?autoreconnect=true"
			username = ""
			password = ""
		}
	}
	production {
		dataSource {
			dbCreate = "update"
		    url = ""
		    username = ""
		    password = ""
		}
	}
}