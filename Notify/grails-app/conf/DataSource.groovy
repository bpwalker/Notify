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
			username = "root"
			password = "ourcolony"
		}
	}
	production {
		dataSource {
			dbCreate = "update"
		    url = "jdbc:mysql://127.11.156.1:3306/notify"
		    username = "adminzw86ArK"
		    password = "zfcVQKkAxwVi"
		}
	}
}