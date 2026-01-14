import { AssetType, CommunicationContext, AudienceScope, AssetDomain, AssetCategory, TaxonomyEntry } from '../types';

export enum InputMethod {
    FILE = 'Upload Files',
    TEXT = 'Paste Text'
}

export interface AssetOption {
    label: string;
    value: AssetType;
    context: CommunicationContext; // Implicit context mapping
}


// --- MULTI-DIMENSIONAL TAXONOMY REGISTRY ---
export const ASSET_TAXONOMY_REGISTRY: TaxonomyEntry[] = [
    // IT & Infrastructure
    { type: AssetType.SYSTEM_DOC, label: 'System Documentation', domain: AssetDomain.IT, category: AssetCategory.OPERATIONAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.CHANGE_REQUEST, label: 'Change Request', domain: AssetDomain.IT, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.INCIDENT_REPORT, label: 'Incident Report', domain: AssetDomain.IT, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.NETWORK_DIAGRAM, label: 'Network Diagram', domain: AssetDomain.IT, category: AssetCategory.TECHNICAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.ARCHITECTURE_DIAGRAM, label: 'Architecture Diagram', domain: AssetDomain.IT, category: AssetCategory.TECHNICAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.RUNBOOK, label: 'Runbook / Playbook', domain: AssetDomain.IT, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.DR_PLAN, label: 'Disaster Recovery Plan', domain: AssetDomain.IT, category: AssetCategory.GOVERNANCE, sensitivity: 'Highly Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.IT_POLICY, label: 'IT Policy', domain: AssetDomain.IT, category: AssetCategory.GOVERNANCE, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.API_DOCS, label: 'API Documentation', domain: AssetDomain.IT, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.RELEASE_NOTES, label: 'Release Notes', domain: AssetDomain.IT, category: AssetCategory.OPERATIONAL, sensitivity: 'Public', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.TECH_SPEC, label: 'Tech Spec', domain: AssetDomain.IT, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.SYSTEM_EXPLAINER, label: 'System Explainer Video', domain: AssetDomain.IT, category: AssetCategory.INTERNAL_COMMS, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },

    // Manufacturing & Shop Floor
    { type: AssetType.WORK_INSTRUCTION, label: 'Work Instruction', domain: AssetDomain.MANUFACTURING, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.QUALITY_CHECKLIST, label: 'Quality Checklist', domain: AssetDomain.MANUFACTURING, category: AssetCategory.REGULATORY, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.EQUIPMENT_MANUAL, label: 'Equipment Manual', domain: AssetDomain.MANUFACTURING, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.MAINTENANCE_LOG, label: 'Maintenance Log', domain: AssetDomain.MANUFACTURING, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.SAFETY_BULLETIN, label: 'Safety Bulletin', domain: AssetDomain.MANUFACTURING, category: AssetCategory.REGULATORY, sensitivity: 'Public', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.SHIFT_HANDOVER, label: 'Shift Handover Report', domain: AssetDomain.MANUFACTURING, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.PRODUCTION_REPORT, label: 'Production Report', domain: AssetDomain.MANUFACTURING, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.SOP, label: 'SOP / Process Flow', domain: AssetDomain.MANUFACTURING, category: AssetCategory.GOVERNANCE, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.PROCESS_EXPLAINER, label: 'Process Explainer Video', domain: AssetDomain.MANUFACTURING, category: AssetCategory.INTERNAL_COMMS, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },

    // Engineering & Product Development
    { type: AssetType.CAD_DRAWING, label: 'CAD Drawing / Blueprint', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.BOM, label: 'Bill of Materials (BOM)', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.TEST_REPORT, label: 'Test Report', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.ECN, label: 'Engineering Change Notice', domain: AssetDomain.ENGINEERING, category: AssetCategory.GOVERNANCE, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.RCA, label: 'Root Cause Analysis', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.FMEA, label: 'FMEA Document', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.TECH_DATASHEET, label: 'Technical Datasheet', domain: AssetDomain.ENGINEERING, category: AssetCategory.COMMERCIAL, sensitivity: 'Public', defaultContext: CommunicationContext.SALES },
    { type: AssetType.PRODUCT_SPEC, label: 'Product Specification', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Public', defaultContext: CommunicationContext.SALES },
    { type: AssetType.RESEARCH_PAPER, label: 'Research Paper', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },
    { type: AssetType.DIAGRAM, label: 'Diagram / Schematic', domain: AssetDomain.ENGINEERING, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.INTERNAL_OPS },

    // HR & People
    { type: AssetType.JOB_DESC, label: 'Job Description', domain: AssetDomain.HR, category: AssetCategory.OPERATIONAL, sensitivity: 'Public', defaultContext: CommunicationContext.HR },
    { type: AssetType.OFFER_LETTER, label: 'Offer Letter', domain: AssetDomain.HR, category: AssetCategory.COMMERCIAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.HR },
    { type: AssetType.RESUME, label: 'Resume/CV', domain: AssetDomain.HR, category: AssetCategory.OPERATIONAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.HR },
    { type: AssetType.INTERVIEW_NOTES, label: 'Interview Notes', domain: AssetDomain.HR, category: AssetCategory.OPERATIONAL, sensitivity: 'Confidential', defaultContext: CommunicationContext.HR },
    { type: AssetType.HR_GUIDE, label: 'HR Handbook/Guide', domain: AssetDomain.HR, category: AssetCategory.GOVERNANCE, sensitivity: 'Internal', defaultContext: CommunicationContext.HR },
    { type: AssetType.PERF_REVIEW, label: 'Performance Review', domain: AssetDomain.HR, category: AssetCategory.OPERATIONAL, sensitivity: 'Highly Confidential', defaultContext: CommunicationContext.HR },

    // General
    { type: AssetType.DOCUMENT, label: 'Document', domain: AssetDomain.GENERAL, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.NOT_SURE },
    { type: AssetType.PRESENTATION, label: 'Presentation', domain: AssetDomain.GENERAL, category: AssetCategory.OPERATIONAL, sensitivity: 'Internal', defaultContext: CommunicationContext.NOT_SURE },
    { type: AssetType.VIDEO, label: 'Video', domain: AssetDomain.GENERAL, category: AssetCategory.INTERNAL_COMMS, sensitivity: 'Internal', defaultContext: CommunicationContext.NOT_SURE },
    { type: AssetType.IMAGE, label: 'Image', domain: AssetDomain.GENERAL, category: AssetCategory.TECHNICAL, sensitivity: 'Internal', defaultContext: CommunicationContext.NOT_SURE },
];

export const INTERNAL_ASSETS: Record<string, AssetOption[]> = {};
ASSET_TAXONOMY_REGISTRY.forEach(entry => {
    const domainLabel = entry.domain;
    if (!INTERNAL_ASSETS[domainLabel]) INTERNAL_ASSETS[domainLabel] = [];
    INTERNAL_ASSETS[domainLabel].push({
        label: entry.label,
        value: entry.type,
        context: entry.defaultContext
    });
});

export const EXTERNAL_ASSETS: Record<string, AssetOption[]> = {
    // For now, mapping a subset or allowing filtered registry.
    // In a full refactor, external assets would also be in the registry with a 'scope' flag.
    "Sales & Commercial": [
        { label: 'Technical Datasheet', value: AssetType.TECH_DATASHEET, context: CommunicationContext.SALES },
        { label: 'Product Specification', value: AssetType.PRODUCT_SPEC, context: CommunicationContext.SALES },
        { label: 'Pitch Deck', value: AssetType.PITCH_DECK, context: CommunicationContext.SALES },
    ],
    "Marketing & Brand": [
        { label: 'Social Media Post', value: AssetType.SOCIAL_ASSET, context: CommunicationContext.MARKETING },
        { label: 'Brand Guidelines', value: AssetType.BRAND_GUIDELINES, context: CommunicationContext.MARKETING },
    ]
};

// --- FORMAT COMPATIBILITY MAP ---
// Defines which asset types are valid for which physical file format categories.
// Categories: DOC (Docs/PDF), PRES (PPTX), VIDEO (MP4/MOV), IMAGE (JPG/PNG), AUDIO (MP3/WAV)

const FORMAT_COMPATIBILITY: Record<string, Set<AssetType>> = {
    DOC: new Set([
        // IT Operations
        AssetType.SYSTEM_DOC, AssetType.CHANGE_REQUEST, AssetType.INCIDENT_REPORT,
        AssetType.RUNBOOK, AssetType.DR_PLAN, AssetType.IT_POLICY, AssetType.API_DOCS,
        AssetType.RELEASE_NOTES, AssetType.TECH_SPEC,
        // Manufacturing
        AssetType.WORK_INSTRUCTION, AssetType.EQUIPMENT_MANUAL, AssetType.MAINTENANCE_LOG,
        AssetType.SAFETY_BULLETIN, AssetType.SHIFT_HANDOVER, AssetType.PRODUCTION_REPORT,
        AssetType.SOP, AssetType.POLICY, AssetType.MEMO, AssetType.PROJECT_REPORT,
        // Engineering
        AssetType.BOM, AssetType.TEST_REPORT, AssetType.ECN, AssetType.RCA, AssetType.FMEA,
        AssetType.TECH_DATASHEET, AssetType.PRODUCT_SPEC, AssetType.RESEARCH_PAPER,
        // Quality
        AssetType.ISO_PROCEDURE, AssetType.AUDIT_REPORT, AssetType.CAPA,
        AssetType.REGULATORY_FILING, AssetType.CERTIFICATION, AssetType.SDS_MSDS,
        // Supply Chain
        AssetType.VENDOR_CONTRACT, AssetType.PURCHASE_ORDER, AssetType.SHIPPING_DOC,
        AssetType.INVENTORY_REPORT, AssetType.SUPPLIER_SCORECARD, AssetType.NDA, AssetType.MSA,
        // HR & People
        AssetType.JOB_DESC, AssetType.OFFER_LETTER, AssetType.RESUME, AssetType.INTERVIEW_NOTES,
        AssetType.HR_GUIDE, AssetType.PERF_REVIEW, AssetType.PRIVACY_POLICY, AssetType.TERMS,
        // Marketing/Sales
        AssetType.WEB_CONTENT, AssetType.BLOG_POST, AssetType.NEWSLETTER, AssetType.PROPOSAL,
        AssetType.CASE_STUDY, AssetType.CONTRACT, AssetType.PRICE_LIST, AssetType.PRESS_RELEASE,
        AssetType.ANNUAL_REPORT, AssetType.USER_GUIDE, AssetType.RESELLER_KIT, AssetType.EBOOK,
        AssetType.BATTLECARD, AssetType.ONE_PAGER, AssetType.BRAND_GUIDELINES, AssetType.INFOGRAPHIC,
        AssetType.DOCUMENT, AssetType.PRESENTATION
    ]),
    PRES: new Set([
        AssetType.PRESENTATION, AssetType.PITCH_DECK, AssetType.TOWN_HALL,
        AssetType.STATUS_REPORT, AssetType.PROJECT_BRIEF, AssetType.PROJECT_REPORT,
        AssetType.ARCHITECTURE_DIAGRAM, AssetType.BRAND_GUIDELINES, AssetType.RESELLER_KIT,
        AssetType.INFOGRAPHIC, AssetType.ELEARNING, AssetType.ORG_CHART
    ]),
    VIDEO: new Set([
        AssetType.VIDEO, AssetType.ONBOARDING_VIDEO, AssetType.TRAINING_VIDEO,
        AssetType.CORP_COMMS_VIDEO, AssetType.EXPLAINER_VIDEO, AssetType.PRODUCT_DEMO,
        AssetType.LEADERSHIP_VLOG, AssetType.MEETING_REC, AssetType.INTERVIEW_REC,
        AssetType.EVENT_RECAP, AssetType.TV_SPOT, AssetType.AD_CAMPAIGN, AssetType.SOCIAL_ASSET
    ]),
    IMAGE: new Set([
        AssetType.IMAGE, AssetType.NETWORK_DIAGRAM, AssetType.ARCHITECTURE_DIAGRAM,
        AssetType.CAD_DRAWING, AssetType.DIAGRAM, AssetType.LOGO, AssetType.SOCIAL_ASSET,
        AssetType.AD_CAMPAIGN, AssetType.WEB_CONTENT, AssetType.POSTER, AssetType.INFOGRAPHIC,
        AssetType.ORG_CHART, AssetType.ONE_PAGER
    ]),
    AUDIO: new Set([
        AssetType.AUDIO, AssetType.VOICE_MEMO, AssetType.MEETING_REC, AssetType.INTERVIEW_REC,
        AssetType.INTERNAL_PODCAST
    ])
};

// Filter logic for Text Input mode
export const TEXT_ONLY_TYPES = new Set([
    // All doc-heavy types that can be analyzed via text
    AssetType.SYSTEM_DOC, AssetType.CHANGE_REQUEST, AssetType.INCIDENT_REPORT,
    AssetType.RUNBOOK, AssetType.IT_POLICY, AssetType.WORK_INSTRUCTION,
    AssetType.SAFETY_BULLETIN, AssetType.SOP, AssetType.POLICY, AssetType.MEMO,
    AssetType.TECH_SPEC, AssetType.RELEASE_NOTES, AssetType.BOM, AssetType.RCA,
    AssetType.FMEA, AssetType.PRODUCT_SPEC, AssetType.RESEARCH_PAPER,
    AssetType.ISO_PROCEDURE, AssetType.AUDIT_REPORT, AssetType.CAPA,
    AssetType.REGULATORY_FILING, AssetType.SDS_MSDS, AssetType.VENDOR_CONTRACT,
    AssetType.NDA, AssetType.MSA, AssetType.JOB_DESC, AssetType.OFFER_LETTER,
    AssetType.AD_CAMPAIGN, AssetType.SOCIAL_ASSET, AssetType.WEB_CONTENT,
    AssetType.PRESS_RELEASE, AssetType.NEWSLETTER, AssetType.BLOG_POST,
    AssetType.CASE_STUDY, AssetType.PROPOSAL, AssetType.DOCUMENT,
    AssetType.USER_GUIDE, AssetType.PRIVACY_POLICY, AssetType.TERMS,
    AssetType.INFOGRAPHIC, AssetType.BRAND_GUIDELINES
]);

export function getAvailableAssets(scope: AudienceScope | null, inputMethod: InputMethod, fileName?: string): Record<string, AssetOption[]> {
    const source = scope === AudienceScope.INTERNAL ? INTERNAL_ASSETS : EXTERNAL_ASSETS;

    // Detect Format Category from Extension
    let formatCategory = 'DOC'; // Default fallback
    if (fileName) {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (['ppt', 'pptx'].includes(ext || '')) formatCategory = 'PRES';
        else if (['mp4', 'mov', 'avi', 'kv', 'webm', 'mkv'].includes(ext || '')) formatCategory = 'VIDEO';
        else if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext || '')) formatCategory = 'IMAGE';
        else if (['mp3', 'wav', 'm4a', 'ogg', 'aac'].includes(ext || '')) formatCategory = 'AUDIO';
        // PDF, DOC, DOCX default to DOC
    }

    // Deep copy to avoid mutating source
    const result: Record<string, AssetOption[]> = {};

    for (const [category, items] of Object.entries(source)) {
        const filtered = items.filter(item => {
            if (inputMethod === InputMethod.TEXT) {
                // Show ONLY Text Types
                return TEXT_ONLY_TYPES.has(item.value);
            }

            // Upload Files: Filter by strict format compatibility if file provided
            if (fileName && formatCategory) {
                const allowedSet = FORMAT_COMPATIBILITY[formatCategory];
                return allowedSet ? allowedSet.has(item.value) : true;
            }

            return true;
        });

        if (filtered.length > 0) {
            result[category] = filtered;
        }
    }

    return result;
}

export function inferContextFromAssetType(type: AssetType): CommunicationContext {
    // Search in both sets
    for (const cat of Object.values(INTERNAL_ASSETS)) {
        const found = cat.find(a => a.value === type);
        if (found) return found.context;
    }
    for (const cat of Object.values(EXTERNAL_ASSETS)) {
        const found = cat.find(a => a.value === type);
        if (found) return found.context;
    }
    return CommunicationContext.NOT_SURE;
}
