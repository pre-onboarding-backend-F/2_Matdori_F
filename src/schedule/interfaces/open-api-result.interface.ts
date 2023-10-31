export interface Head {
	list_total_count: number;
	RESULT: {
		CODE: string;
		MESSAGE: string;
	};
	api_version: string;
}

export interface Row {
	SIGUN_NM: string;
	SIGUN_CD: null;
	BIZPLC_NM: string;
	LICENSG_DE: string;
	BSN_STATE_NM: string;
	CLSBIZ_DE: null;
	LOCPLC_AR: null;
	GRAD_FACLT_DIV_NM: null;
	MALE_ENFLPSN_CNT: number;
	YY: null;
	MULTI_USE_BIZESTBL_YN: null;
	GRAD_DIV_NM: null;
	TOT_FACLT_SCALE: null;
	FEMALE_ENFLPSN_CNT: number;
	BSNSITE_CIRCUMFR_DIV_NM: null;
	SANITTN_INDUTYPE_NM: null;
	SANITTN_BIZCOND_NM: string;
	TOT_EMPLY_CNT: number;
	REFINE_LOTNO_ADDR: string;
	REFINE_ROADNM_ADDR: string;
	REFINE_ZIP_CD: string;
	REFINE_WGS84_LOGT: string;
	REFINE_WGS84_LAT: string;
}

export interface OpenApiResultArray {
	head: Head[];
	row: Row[];
}

export interface OpenApiResult<T> {
	[key: string]: T[];
}

export type OpenApiResults = OpenApiResult<OpenApiResultArray>[];
